import { useEffect, useState } from "react";

interface FullUser {
  _id: string;
  name: string;
  avatar?: string;
  point: number;
}

export default function TopSection() {
  const [users, setUsers] = useState<FullUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopUsers = async () => {
    try {
      const res = await fetch("http://localhost:3402/MetricUsers/top");
      const data: FullUser[] = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching top users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopUsers();
    const interval = setInterval(fetchTopUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const medals = [
    { bg: "bg-yellow-400", icon: "🥇" },
    { bg: "bg-gray-300", icon: "🥈" },
    { bg: "bg-orange-400", icon: "🥉" },
  ];

  return (
    <section className="max-w-sm sm:w-full py-8 px-6 bg-secondary text-white  rounded-lg border-rounded-lg border ">
      <div className="max-w-xl mx-auto space-y-6">

       
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-extrabold text-primary tracking-wide">Lectores a la Guerra</h2>
          <p className="text-sm text-gray-500">Top 5 lectores de Tintas</p>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-700"></div>

        {/* Listado */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((u, idx) => {
              const isTop3 = idx < 3;
              return (
                <div
                  key={u._id}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl
                    ${idx === 0 ? "bg-primary" : ""}
                    hover:bg-[#1a2c3b] transition
                  `}
                >
                  {/* Left block */}
                  <div className="flex items-center gap-3">
                    {/* Rank circle */}
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center 
                        text-lg font-bold
                        ${isTop3 ? medals[idx].bg : "bg-fund"}
                        text-black
                      `}
                    >
                      {isTop3 ? medals[idx].icon : idx + 1}
                    </div>

                    {/* Avatar + name */}
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={u.avatar || "/hostImage/LOGO-COLOR.png"}
                          className="w-11 h-11 rounded-full object-cover border border-gray-600"
                        />

                       
                      </div>

                      <div className="flex flex-col">
                        <span className="font-semibold text-base">
                          {u.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right font-bold text-yellow-800">
                    {u.point.toLocaleString()} XP
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
