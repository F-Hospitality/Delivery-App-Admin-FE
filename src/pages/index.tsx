

export default function Home() {



  return (
    <div>
      <div className="flex justify-between p-3">
        <div className="flex flex-col">
          <img className="h-20 w-20 mb-2" src="/hospitality.png" />
          <span>What do you want to eat today?</span>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="red" d="M14 9q-.425 0-.712-.288T13 8V4q0-.425.288-.712T14 3h6q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9zM4 13q-.425 0-.712-.288T3 12V4q0-.425.288-.712T4 3h6q.425 0 .713.288T11 4v8q0 .425-.288.713T10 13zm10 8q-.425 0-.712-.288T13 20v-8q0-.425.288-.712T14 11h6q.425 0 .713.288T21 12v8q0 .425-.288.713T20 21zM4 21q-.425 0-.712-.288T3 20v-4q0-.425.288-.712T4 15h6q.425 0 .713.288T11 16v4q0 .425-.288.713T10 21z"/></svg>
      </div> 
      <div className="w-full px-5 pt-10 pb-20 flex-col flex text-white bg-gradient-to-r from-red-400  to-red-700">
        <span className="text-5xl font-semibold">Discount </span>
        <span className="text-5xl font-semibold mb-4">New Menu</span>
        <span>Get Free Delivery Every $6000 With No Minimum Purchase</span>
      </div>
      <div className="mt-3 flex flex-col pl-5">
        <span className="text-black text-xl font-semibold">Categories </span>
      </div>

    </div>
  );
}
