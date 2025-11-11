import React, { useState, useEffect } from 'react';
import ParkingMap from './components/ParkingMap';
import BookingForm from './components/BookingForm';
import BookingDetail from './components/BookingDetail';

export default function ParkingApp() {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const [showModalList, setShowModalList] = useState(false);
  const [bookingList, setBookingList] = useState<{slot:number, name:string, plate:string}[]>([]);

  const ROWS = 2;
  const COLS = 7;
  const TOTAL_SLOTS = ROWS * COLS;

  // Update jumlah booking setiap load
  useEffect(() => {
    updateBookingCount();
  }, []);

  function updateBookingCount() {
    const slots = Array.from({length: TOTAL_SLOTS}, (_,i)=>i+1);
    let count = 0;
    const list: {slot:number,name:string,plate:string}[] = [];
    slots.forEach(slot=>{
      const data = localStorage.getItem('booking_'+slot);
      if(data){
        count++;
        const record = JSON.parse(data);
        list.push({slot,name:record.name,plate:record.plate});
      }
    });
    setBookingCount(count);
    setBookingList(list);
  }

  function handleSelectSlot(slot:number){
    const data = localStorage.getItem('booking_'+slot);
    setSelectedSlot(slot);
    if(data) setShowDetail(true);
    else setShowForm(true);
  }

  function handleDone(){
    setShowForm(false);
    setSelectedSlot(null);
    updateBookingCount();
  }

  function handleEnd(){
    if(selectedSlot !== null) localStorage.removeItem('booking_'+selectedSlot);
    setShowDetail(false);
    setSelectedSlot(null);
    updateBookingCount();
  }

  return (
    <div className="relative min-h-screen ">
      <ParkingMap onSelectSlot={handleSelectSlot} />

      {/* Floating button */}
      <button
        className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-lg font-bold hover:bg-blue-700 transition"
        onClick={()=>{
          // ambil data terbaru saat modal dibuka
          updateBookingCount();
          setShowModalList(true);
        }}
        title="Jumlah Pemesanan"
      >
        {bookingCount}
      </button>

      {/* Modal daftar booking */}
      {showModalList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black p-4 rounded w-80 max-h-[80vh] overflow-y-auto relative">
            <h2 className="text-xl font-bold mb-2">Daftar Booking</h2>
            <button className="absolute top-2 right-2 text-red-500 font-bold" onClick={()=>setShowModalList(false)}>X</button>
            {bookingList.length === 0 ? (
              <p className="text-center">Tidak ada booking</p>
            ) : (
              <ul className="space-y-2">
                {bookingList.map(b=>(
                  <li key={b.slot} className="p-2 border rounded">
                    <p>Slot #{b.slot}</p>
                    <p>Nama: {b.name}</p>
                    <p>Plat: {b.plate}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Modal Booking Form */}
      {showForm && selectedSlot !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <BookingForm slot={selectedSlot} onDone={handleDone} />
        </div>
      )}

      {/* Modal Booking Detail */}
      {showDetail && selectedSlot !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <BookingDetail slot={selectedSlot} onEnd={handleEnd} />
        </div>
      )}
    </div>
  )
}
