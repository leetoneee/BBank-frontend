const spinner = () => {
  const loaderElement = document.getElementsByClassName("loader")[0];
  if (loaderElement) {
    loaderElement.style.display = "flex";

    return new Promise((resolve) => {
      setTimeout(() => {
        loaderElement.style.display = "none";
        resolve(); // Đánh dấu là đã hoàn thành
      }, 2000); // Thời gian đặt là 2000ms (tức là 2 giây)
    });
  }
};

function Loading() {
  return (
    <div className="loader h-screen w-screen 
                        bg-[#D9D9D9] opacity-85
                        z-40 absolute inset-0 hidden justify-center items-center">
      <div className=" w-80 h-80 border-solid rounded-[50%]
                            bg-gradient-to-br from-[#ededed] to-[#36F3FF] p-11
                              animate-spin">
        <div className=" h-full w-full rounded-[50%] bg-[#D9D9D9] opacity-85">

        </div>
      </div>
    </div>
  )
}

export { spinner, Loading };