import { useNavigate, useLocation } from "react-router-dom";
import { useCartLogic } from "../CustomHooks/useCartLogic";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const tableName = new URLSearchParams(location.search).get("table");
  console.log(tableName);
  const { clearCart } = useCartLogic(tableName);
  console.log(tableName);

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Main Content - Upper Half */}
      <div className="flex flex-col items-center  h-[50%] justify-center p-4">
        <div className="flex cursor-pointer items-center gap-2">
          <img className="w-28 h-28" src="/Coffee.png" alt="logo" />
        </div>
        <p className="text-2xl pl-3 font-semibold">Bistro</p>
      </div>

      {/* Bottom Section - Lower Half */}
      <div className="h-[50%] flex flex-col items-center ">
        <div className="mt-2 text-left text-xl">Welcome</div>

        <button
          onClick={async () => {
            if (!tableName) {
              alert("Missing table identifier in URL");
              return;
            }

            await clearCart(); // Clear only if tableName exists
            navigate(`/order/Categories/?Table=${tableName}`);
          }}
          className="bg-white mt-5 shadow-[0_0_4px_rgba(128,128,128,0.6)] rounded-lg h-14 py-2 px-6 flex items-center space-x-2"
        >
          <span>Order Now</span>
        </button>
      </div>
    </div>
  );
}

export default Home;
