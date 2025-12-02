import { useEffect, useState } from "react";

interface FullUser {
  _id: string;
  name: string;
  avatar?: string;
  point: number;
  imgLevel?: string; // marco de nivel
  level?: { level: number }; // nivel del usuario
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
    <section className="max-w-sm sm:w-full py-8 px-6 bg-secondary text-white rounded-lg border">
      <div className="max-w-xl mx-auto space-y-1">
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-extrabold text-primary tracking-wide">Lectores a la Guerra</h2>
          <p className="text-sm text-gray-500">Top 5 lectores de Tintas</p>
        </div>

        <div className="w-full h-[1px] bg-gray-700"></div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent"></div>
          </div>
        ) : (
          <div >
            {users.map((u, idx) => {
              const isTop3 = idx < 3;
              return (
                <div
                  key={u._id}
                  className="flex items-center justify-between px-2 py-2 rounded-xl hover:bg-primary transition"
                >
                  <div className="flex items-center gap-2">
                    {/* RANK CIRCLE */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-black shadow-md border border-white ${
                        isTop3 ? medals[idx].bg : "bg-gray-300"
                      }`}
                    >
                      {isTop3 ? medals[idx].icon : idx + 1}
                    </div>

                    {/* AVATAR + LEVEL FRAME */}
                    <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                      {/* Marco de nivel */}
                      {u.imgLevel && (
                        <img
                          src={u.imgLevel}
                          alt="Marco de nivel"
                          className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
                        />
                      )}

                      {/* Avatar */}
                      <img
                        src={u.avatar || "/hostImage/LOGO-COLOR.png"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white z-20"
                        alt={u.name}
                      />

                      {/* Badge de nivel */}
                      <div className="absolute -bottom-1 -right-1 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm z-20">
                        Lv.{u.level?.level || 1}
                      </div>
                    </div>

                    {/* Nombre */}
                    <div className="flex flex-col">
                      <span className="font-semibold text-base">{u.name}</span>
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
