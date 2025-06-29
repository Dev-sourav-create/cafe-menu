import { useNavigate, useLocation } from "react-router-dom";
import { useCartLogic } from "../CustomHooks/useCartLogic";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const tableName = new URLSearchParams(location.search).get("table");
  console.log(tableName);
  const { clearCart } = useCartLogic(tableName);

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Main Content - Upper Half */}
      <div className="flex flex-col items-center h-[50%] justify-center p-4">
        <div className="relative w-40 h-40 bg-yellow-300 rounded-lg flex items-center justify-center">
          <div className="text-2xl font-semibold">Ravli</div>
        </div>
        <div className="mt-4 text-center text-xl">Cafe Ravli</div>
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
            navigate(`/Order/Categories/?table=${tableName}`);
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
