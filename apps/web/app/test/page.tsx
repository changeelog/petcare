// app/(main)/page.tsx
import { db } from "../../lib/index";
import { usersTable } from "../../lib/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  // Получаем всех пользователей из базы данных
  const users = await db.select().from(usersTable).all();

  // Функция для добавления нового пользователя
  async function addUser(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const age = parseInt(formData.get("age") as string);
    const email = formData.get("email") as string;

    await db.insert(usersTable).values({ name, age, email });

    // Перевалидируем страницу, чтобы обновить данные
    revalidatePath("/");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Форма для добавления нового пользователя */}
      <form action={addUser} className="mb-8">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>
      </form>

      {/* Список пользователей */}
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-4 border rounded">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
