import { useEffect, useState } from "react";

interface FullUser {
  _id: string;
  name: string;
  avatar?: string;
  point: number;
}

export default function GamificationSection() {
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

  const medals = ["🥇", "🥈", "🥉"];
  const colors = [
    "from-orange-100 to-orange-200 border-orange-300",
    "from-yellow-100 to-yellow-200 border-yellow-300",
    "from-gray-100 to-gray-200 border-gray-300"
  ];

  return (
    <section className="w-full py-24 px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          
          <h2 className="text-5xl font-extrabold tracking-tight bg-primary bg-clip-text text-transparent">
            Experiencia Gamificada
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leé, participá en desafíos y sumá puntos para alcanzar el top del mes
          </p>
        </div>

        {/* Top 5 Leaderboard */}
        <div className=" rounded-3xl">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {users.map((u, idx) => {
                const isTopThree = idx < 3;
                return (
                  <div
                    key={u._id}
                    className={`
                      relative
                      bg-gradient-to-br ${isTopThree ? colors[idx] : 'from-white to-gray-50 border-gray-200'}
                      border-2
                     
                      p-6 rounded-2xl 
                      flex flex-col items-center text-center
                      
                      ${isTopThree ? 'ring-2 ring-offset-2 ring-primary' : ''}
                    `}
                  >
                    {/* Rank Badge */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {idx + 1}
                    </div>

                    {/* Medal */}
                    <div className="text-5xl mb-4 ">
                      {medals[idx] || "🎖️"}
                    </div>

                    {/* Avatar */}
                    <div className="relative mb-4">
                      <img
                        src={u.avatar || "/hostImage/LOGO-COLOR.png"}
                        alt={u.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      {isTopThree && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8  rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-lg">⭐</span>
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <p className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                      {u.name}
                    </p>

                    {/* Points */}
                    <div className="bg-white rounded-full px-4 py-2 shadow-md">
                      <p className="text-sm font-bold bg-primary bg-clip-text text-transparent">
                        {u.point.toLocaleString()} pts
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

         
        </div>
      </div>
    </section>
  );
}

