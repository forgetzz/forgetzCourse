"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {

  doc,

  increment,

  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

import Alert from "@/components/layoutComponents/alert";
import { fetchData } from "@/service/Fetchdata";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/utils/Colors";
import { Moon, Sun, ThermometerIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/Types/User";


export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth()
  const router = useRouter();
  const [alert, setAlert] = useState(false)
  const { isDark, ThemeToggle } = useTheme()
  


  const theme = isDark ? Colors.Primary_BG : Colors.Secondary_BG

  const fetchDatas = async () => {

    const data = await fetchData<User>("users")
    setUsers(data);
  };



  useEffect(() => {
    fetchDatas();
  }, [user])

  const handleUpdate = async (uid: string) => {
    try {

      await updateDoc(doc(db, "users", uid), {
        defi: true,

      })
      setAlert(true)
    } catch {
      console.log("erorr")
    }
  }

  const handleUpdate2 = async (uid: string) => {
    try {

      await updateDoc(doc(db, "users", uid), {
        trade: true
      })

      setAlert(true)
      console.log("erorr")
    } catch {
      console.log("erorr")
    }
  }



  const handleLogout = () => {
    signOut(auth).then(() => router.replace("/admin/login"));
  };


  if (user?.email != "admin@quantum.com ") {
    // return router.replace("/admin/login")
  }

  const updateTaskDefi = async (
    uid: string,
    value: number
  ) => {

    try {

      await updateDoc(
        doc(db, "users", uid),
        {
          TaskDefi: increment(value),
        }
      );

      fetchDatas();

    } catch (error) {

      console.log(error);

    }
  };

  const updateTaskTrade = async (
    uid: string,
    value: number
  ) => {

    try {

      await updateDoc(
        doc(db, "users", uid),
        {
          TaskTrade: increment(value),
        }
      );

      fetchDatas();

    } catch (error) {

      console.log(error);

    }
  };


  return (
    <div className={`min-h-screen p-6 ${theme}`}>
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center justify-between mb-6">
          <button className="flex border-orange-500 border-2   shadow-[0_0_15px_#f97316] p-1  rounded-md" onClick={ThemeToggle}>
            {isDark ? <p className="flex p-1 gap-2"><Sun /> Dark</p> : <p className="flex p-1 gap-2"><Moon /> Dark</p>}
          </button>

          <h1 className="text-3xl font-bold text-orange-600">
            🛠 Admin Panel - Quantum Bootcamp
          </h1>

          <button
            onClick={handleLogout}
            className="bg-orange-500 px-4 py-2 rounded hover:bg-gray-400"
          >
            Logout
          </button>

        </div>

        <section className={`p-6 rounded-xl shadow text-gray-800 ${theme}`} >
          <h2 className="text-2xl font-semibold mb-4">👥 Daftar User</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left">
              <thead className="">
                <tr>


                  <th className="p-2 text-sm">Username</th>
                  <th className="p-2 text-sm">Email</th>
                  <th className="p-2 text-sm">addressEVM</th>
                  <th className="p-2 text-sm">Rekening</th>
                  <th className="p-2 text-sm">Whatsap</th>
                  <th className="p-2 text-sm">Defi Task</th>
                  <th className="p-2 text-sm">Trade Task</th>
                  <th className="p-2 text-sm">Defi Activasi</th>
                  <th className="p-2 text-sm">trade Activasi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i} className="border-t hover:border-orange-500">


                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      {user.addressEVM.slice(0, 3)}...
                      {user.addressEVM.slice(-3)}
                    </td>
                    <td className="p-3">{user.rekening}</td>
                    <td className="p-3">{user.whatsapp}</td>
                    <td className="p-3">

                      <div className="flex items-center gap-2">
                        {/* minus */}
                        <button
                          onClick={() =>
                            updateTaskDefi(user.uid, -1)
                          }
                          className="
        w-8
        h-8
        rounded-lg
        bg-red-500
        text-white
      "
                        >
                          -
                        </button>

                        {/* total */}
                        <span className="min-w-[30px] text-center">
                          {user.TaskDefi}
                        </span>

                        {/* plus */}
                        <button
                          onClick={() =>
                            updateTaskDefi(user.uid, 1)
                          }
                          className="
        w-8
        h-8
        rounded-lg
        bg-green-500
        text-white
      "
                        >
                          +
                        </button>

                      </div>

                    </td>

                    <td className="p-3">

                      <div className="flex items-center gap-2">

                        {/* minus */}
                        <button
                          onClick={() =>
                            updateTaskTrade(user.uid, -1)
                          }
                          className="
        w-8
        h-8
        rounded-lg
        bg-red-500
        text-white
      "
                        >
                          -
                        </button>

                        {/* total */}
                        <span className="min-w-[30px] text-center">
                          {user.TaskTrade}
                        </span>

                        {/* plus */}
                        <button
                          onClick={() =>
                            updateTaskTrade(user.uid, 1)
                          }
                          className="w-8 h-8rounded-lg bg-green-500 text-white"
                        >
                          +
                        </button>

                      </div>

                    </td>


                    <td> <button className="text-white" onClick={() => handleUpdate(user.uid)}>{user.defi ? <p className="bg-green-500 p-2 rounded-lg">Aktif</p> : <p className="bg-red-500 p-2 rounded-lg">NonAktif</p>}</button></td>


                    <td className="p-3">< button className="text-white" onClick={() => handleUpdate2(user.uid)}>{user.trade ? <p className="bg-green-500 p-2 rounded-lg">Aktif</p> : <p className="bg-red-500 p-2 rounded-lg">NonAktif</p>}</button></td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>


        <div className="fixed left-1/2 top-5 -translate-x-1/2 z-50">
          <Alert
            show={alert}
            setShow={setAlert}
            title="Berhasil"
            description="Data berhasil disimpan"
            color="success"
          />
        </div>


      </div>
    </div>
  );
}
