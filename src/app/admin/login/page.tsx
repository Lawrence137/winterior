import { login } from "../actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <form action={login} className="w-full max-w-sm space-y-6">
        <h1 className="font-display text-4xl">Winterior admin</h1>
        <input
          name="password"
          type="password"
          required
          autoFocus
          placeholder="Password"
          className="w-full border-b border-ink/30 bg-transparent py-3 outline-none focus:border-brass"
        />
        {error && <p className="text-sm text-red-600">Incorrect password.</p>}
        <button className="w-full bg-ink px-6 py-3 text-sm tracking-widest text-white uppercase transition hover:bg-brass">
          Sign in
        </button>
      </form>
    </main>
  );
}