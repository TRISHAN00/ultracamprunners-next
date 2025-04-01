export default function BottomBar() {
  return (
    <section className="w-full bg-[#AD242F]">
      <div className="max-w-[1300px] mx-auto py-8 border-t flex flex-col justify-center md:flex-row md:justify-between items-center gap-4">
        <div className="flex flex-col gap-4 w-full justify-between md:flex-row text-center text-md font-semibold text-white ">
          <p>Copyright ©{new Date().getFullYear()}. All Rights Reserved.</p>
          <p>Developed by CodemanBD</p>
        </div>
      </div>
    </section>
  )
}
