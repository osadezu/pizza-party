export default function Header() {
  return (
    <div className='w-screen fixed flex justify-between items-end'>
      <div className='flex items-end'>
        <h1 className='font-cursive text-7xl mt-4 mx-14'>PizzaParty 🍕</h1>
        <h2 className='relative top-6 font-mono text-5xl font-medium'>
          Your Team Name
        </h2>
      </div>
      <div className='mx-10'>Avatar</div>
    </div>
  );
}
