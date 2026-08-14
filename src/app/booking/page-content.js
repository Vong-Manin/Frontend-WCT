// app/booking/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { useResortContent } from "@/app/components/providers/ResortContentProvider";
import BookingHeader from "@/app/components/booking/BookingHeader";
import BookingProgress from "@/app/components/booking/BookingProgress";
import BookingRoom from "@/app/components/booking/BookingRoom";
import BookingGuestDetail from "@/app/components/booking/BookingGuestDetail";
import BookingSuccess from "@/app/components/booking/BookingSuccess";
import BookingSummary from "@/app/components/booking/BookingSummary";
import { createRoomBooking } from "@/lib/services/bookings";

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function BookingPage() {
  const { rooms, isLoading: contentLoading } = useResortContent();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoomId = searchParams.get("room");
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const countdownRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  const [countdown, setCountdown] = useState(10);
  const availableRooms = rooms;

  // Cart: Array of selected rooms with quantities
  const [cart, setCart] = useState(() => {
    const foundRoom = rooms.find((room) => room.id === Number(initialRoomId));
    return foundRoom
      ? [{ roomId: foundRoom.id, room: foundRoom, quantity: 1, guests: 1 }]
      : [];
  });

  // Booking dates (shared across all rooms)
  const [bookingData, setBookingData] = useState(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return { checkIn: formatLocalDate(today), checkOut: formatLocalDate(tomorrow) };
  });

  // Guest details form data - Auto-filled with Clerk user data
  const [guestData, setGuestData] = useState({
    fullName: user?.fullName || user?.firstName || "",
    email: user?.emailAddresses?.[0]?.emailAddress || "",
    phone: user?.phoneNumbers?.[0]?.phoneNumber || "",
    specialRequests: "",
    paymentMethod: "credit_card",
  });

  // Check authentication
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      // Redirect to sign-in with return URL
      const returnUrl = `/booking?room=${initialRoomId}`;
      router.push(`/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`);
    }
  }, [isLoaded, isSignedIn, router, initialRoomId]);

  const effectiveGuestData = {
    ...guestData,
    fullName: guestData.fullName || user?.fullName || user?.firstName || "",
    email: guestData.email || user?.emailAddresses?.[0]?.emailAddress || "",
    phone: guestData.phone || user?.phoneNumbers?.[0]?.phoneNumber || "",
  };

  // Calculate nights
  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const start = new Date(bookingData.checkIn);
      const end = new Date(bookingData.checkOut);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    }
    return 1;
  };

  const nights = calculateNights();

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    let totalGuests = 0;
    let totalRooms = 0;

    cart.forEach((item) => {
      subtotal += item.room.price * nights * item.quantity;
      totalGuests += item.guests * item.quantity;
      totalRooms += item.quantity;
    });

    const serviceFee = Math.round(subtotal * 0.1);
    const tax = Math.round(subtotal * 0.12);
    const grandTotal = subtotal + serviceFee + tax;

    return { subtotal, serviceFee, tax, grandTotal, totalGuests, totalRooms };
  };

  const totals = calculateTotals();

  // Cart actions
  const addToCart = (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setCart((prev) => [
        ...prev,
        {
          roomId: room.id,
          room: room,
          quantity: 1,
          guests: 1,
        },
      ]);
      setBookingError("");
    }
  };

  const removeFromCart = (roomId) => {
    setCart((prev) => prev.filter((item) => item.roomId !== roomId));
  };

  const updateQuantity = (roomId, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.roomId === roomId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item,
      ),
    );
  };

  const updateGuests = (roomId, newGuests) => {
    setCart((prev) =>
      prev.map((item) =>
        item.roomId === roomId
          ? { ...item, guests: Math.max(1, newGuests) }
          : item,
      ),
    );
  };

  // Handle booking form changes
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
    setBookingError("");
  };

  // Handle guest form changes
  const handleGuestChange = (e) => {
    const { name, value } = e.target;
    setGuestData((prev) => ({ ...prev, [name]: value }));
    setBookingError("");
  };

  // Go to next step
  const goToNextStep = () => {
    if (currentStep === 1) {
      if (!bookingData.checkIn || !bookingData.checkOut) {
        setBookingError("Please select check-in and check-out dates");
        return;
      }
      if (cart.length === 0) {
        setBookingError("Please add at least one room to your booking");
        return;
      }
      setBookingError("");
      setCurrentStep(2);
    }
  };

  // Go to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setBookingError("");
    }
  };

  // Handle booking submission
  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setBookingError("");

    if (!effectiveGuestData.fullName || !effectiveGuestData.email || !effectiveGuestData.phone) {
      setBookingError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = await getToken();
      const booking = await createRoomBooking(
        {
          customerName: effectiveGuestData.fullName,
          email: effectiveGuestData.email,
          phone: effectiveGuestData.phone,
          checkInDate: bookingData.checkIn,
          checkOutDate: bookingData.checkOut,
          specialRequest: guestData.specialRequests,
          paymentMethod: guestData.paymentMethod,
          rooms: cart.map((item) => ({
            ...(item.room.documentId
              ? { documentId: item.room.documentId }
              : { legacyId: item.room.id }),
            quantity: item.quantity,
            guests: item.guests,
          })),
        },
        token,
      );
      setBookingReference(booking.bookingReference);
      setCurrentStep(3);
    } catch (error) {
      setBookingError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Countdown timer for success page
  useEffect(() => {
    if (currentStep === 3 && countdown > 0) {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }

      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            setTimeout(() => {
              router.push("/");
            }, 100);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (countdownRef.current) {
          clearInterval(countdownRef.current);
        }
      };
    }
  }, [currentStep, countdown, router]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-resortGreen/20 border-t-resortGreen rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            {!isLoaded ? "Loading..." : "Redirecting to sign in..."}
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-resortGreen/20 border-t-resortGreen rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            Loading booking details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <BookingHeader roomId={initialRoomId} step={currentStep} />
        <BookingProgress currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <BookingRoom
                room={
                  rooms.find((r) => r.id === parseInt(initialRoomId)) ||
                  rooms[0]
                }
                bookingData={bookingData}
                onBookingChange={handleBookingChange}
                nights={nights}
                subtotal={totals.subtotal}
                serviceFee={totals.serviceFee}
                tax={totals.tax}
                grandTotal={totals.grandTotal}
                onNext={goToNextStep}
                error={bookingError}
                availableRooms={availableRooms}
                cart={cart}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateQuantity}
                onUpdateGuests={updateGuests}
              />
            )}

            {currentStep === 2 && (
              <BookingGuestDetail
                formData={effectiveGuestData}
                onFormChange={handleGuestChange}
                onBack={goToPreviousStep}
                onSubmit={handleSubmitBooking}
                isSubmitting={isSubmitting}
                error={bookingError}
              />
            )}

            {currentStep === 3 && (
              <BookingSuccess
                email={effectiveGuestData.email}
                bookingReference={bookingReference}
                guestName={effectiveGuestData.fullName}
                roomTitle={
                  cart.length === 1
                    ? cart[0].room.title
                    : `${cart.length} rooms`
                }
                checkIn={bookingData.checkIn}
                checkOut={bookingData.checkOut}
                guests={totals.totalGuests}
                roomsCount={totals.totalRooms}
                totalPrice={totals.grandTotal}
                countdown={countdown}
                cart={cart}
                nights={nights}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <BookingSummary
              room={
                rooms.find((r) => r.id === parseInt(initialRoomId)) || rooms[0]
              }
              bookingData={bookingData}
              nights={nights}
              subtotal={totals.subtotal}
              serviceFee={totals.serviceFee}
              tax={totals.tax}
              grandTotal={totals.grandTotal}
              cart={cart}
              totalRooms={totals.totalRooms}
              totalGuests={totals.totalGuests}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
