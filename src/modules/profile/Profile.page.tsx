import { useState } from "react";
import Navbar from "../../common/components/navbar";
import Footer from "../../common/components/Footer";
import { useAuth } from "../../context/AuthContext";
import SectionCard from "./components/SectionCard";
import TabNav, { type TabKey } from "./components/TabNav";
import ProfileSidebar from "./components/ProfileSidebar";
import ProgressList from "./components/ProgressList";
import { useContinueReading } from "../home/hooks/useContinueReading";
import type { BookWithProgress } from "../../types/books";
import { deleteUserAccount } from "./services/user.api";
import EditProfileModal from "./components/EditProfileModal";
import DeleteAccountDialog from "./components/DeleteAccountDialog";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, token, logout, refreshUser } = useAuth();
  const [tab, setTab] = useState<TabKey>("progress");

  const { data: progress, isLoading, isError } = useContinueReading(token);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const onConfirmDelete = async () => {
    if (!token) return;
    setDeleting(true);
    try {
      await deleteUserAccount(token);
      toast.success("Cuenta eliminada");
      logout();
    } catch (e: any) {
      toast.error(e?.message || "No pudimos eliminar tu cuenta");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-fund overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-30 pb-10 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* izquierda */}
          <aside className="lg:col-span-3">
            <ProfileSidebar
              user={user}
              onEdit={() => setOpenEdit(true)}
              onDelete={() => setOpenDelete(true)}
            />
          </aside>

          {/* derecha */}
          <section className="lg:col-span-9 space-y-6">
            <SectionCard>
              <div className="flex flex-col min-h-[600px] max-h-[calc(100vh-16rem)]">
                <TabNav
                  active={tab}
                  onChange={setTab}
                  tabs={[
                    { key: "activity", label: "Actividad", disabled: true },
                    { key: "progress", label: "Tu progreso" },
                    { key: "achievements", label: "Logros", disabled: true },
                    { key: "social", label: "Social", disabled: true },
                  ]}
                />

                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  {tab === "progress" && (
                    <ProgressList
                      loading={isLoading}
                      error={
                        isError ? "No pudimos cargar tu progreso" : undefined
                      }
                      items={(progress ?? []) as BookWithProgress[]}
                    />
                  )}
                </div>
              </div>
            </SectionCard>
          </section>
        </div>
      </main>

      {/* Modales (fuera de main, para evitar overflow y problemas de stacking) */}
      {token && (
        <EditProfileModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          token={token}
          initial={{
            name: user?.name,
            lastName: user?.lastName,
            userName: user?.userName,
            birthDate: user?.birthDate,
            email: user?.email,
          }}
          onUpdated={refreshUser}
        />
      )}

      <DeleteAccountDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onConfirmDelete}
        loading={deleting}
      />

      <Footer />
    </div>
  );
}
