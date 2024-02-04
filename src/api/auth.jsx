import { supabase } from "./client";

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  console.log(data);
  console.log(error);
}

async function banUser(id, active) {
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    ban_duration: active ? "none" : "876600h", // 100 years
  });

  console.log(error);
}

async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      const message =
        "Email o contraseña incorrectos, si las credenciales son correctas entonces usted se encuentra banead@";
      return { message: message, isValid: false };
    } else {
      return { session: data.session, message: "Login Exitoso", isValid: true };
    }
  } catch (error) {
    console.log(error);
    return { message: error.message, isValid: false };
  }
}

async function register(
  name,
  last_name,
  phone,
  email,
  password,
  confirmPassword
) {
  if (password.length < 6 || confirmPassword.length < 6) {
    return {
      message: "La contraseña tiene que tener al menos 6 caracteres",
      isValid: false,
    };
  } else if (password !== confirmPassword) {
    return { message: "Las contraseñas no coinciden", isValid: false };
  }

  try {
    let { data: profiles, err } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .single();

    if (profiles !== null) {
      return { message: "Este correo ya existe", isValid: false };
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return { message: error.message, isValid: false };
    else {
      await supabase
        .from("profiles")
        .update([
          {
            name: name,
            last_name: last_name,
            phone_number: phone,
            email: email,
            isActive: true,
          },
        ])
        .eq("id", data.user.id)
        .select();

      return {
        message: "Revisa tu correo electrónico para confirmar tu registro.",
        isValid: true,
      };
    }
  } catch (error) {
    return { message: error.message, isValid: false };
  }
}

const getUserRole = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (data.session === undefined || data.session === null || error) {
    return null;
  }

  let { data: profiles } = await supabase
    .from("profiles")
    .select("role")
    .eq("email", data.session.user.email);

  if (error) {
    console.log(error);
    return null;
  }
  if (profiles[0] !== null && profiles[0] !== undefined) {
    return profiles[0].role;
  }
};

export { signInWithGoogle, login, register, getUserRole, banUser };
