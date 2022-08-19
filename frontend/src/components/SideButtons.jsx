const SideButtons = () => {
  return (
    <>
    <div class="py-8 px-6 mx-auto ">
        <a
            href="/createproject"
            class="p-3 px-6 pt-2 shadow-2xl text-black bg-custom-150 rounded-full baseline hover:bg-custom-100 hover:text-white">Add New Project
        </a>
    </div>
    <div class="py-8 px-6 mx-auto ">
        <a
            href="/refer"
            class="p-3 px-6 pt-2 shadow-2xl text-black bg-custom-150 rounded-full baseline hover:bg-custom-100 hover:text-white">Refer Stakeholder
        </a>
    </div>
    </>
  )
}

export default SideButtons