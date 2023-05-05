"use client";

export default function LoginPage() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target)
    const username = formData.get('username');
    const password = formData.get('password');

    await fetch('/api/login',{
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    })

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
