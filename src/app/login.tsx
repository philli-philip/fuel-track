import React, { useContext, useRef, useState } from "react";
import {
  Alert,
  AppState,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "@/src/utils/supabase/supabase";
import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import Button from "../components/button/button";
import { useTranslation } from "react-i18next";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const colors = useContext(ThemeContext);
  const style = styling(colors);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailField = useRef<TextInput>(null);
  const { t } = useTranslation("translation", { keyPrefix: "login" });

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    if (data.session) {
      router.replace("/");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <Image
        source={require("@/assets/images/favicon.png")}
        style={{ width: 72, height: 72 }}
      />
      <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder={t("emailPlaceholder")}
        autoCapitalize="none"
        style={style.input}
        placeholderTextColor={colors.text.light}
        onSubmitEditing={() => emailField?.current?.focus()}
        returnKeyType="next"
        autoFocus
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        style={style.input}
        placeholder={t("password")}
        autoCapitalize={"none"}
        placeholderTextColor={colors.text.light}
        onSubmitEditing={() => signInWithEmail()}
        returnKeyType="send"
        ref={emailField}
      />
      <Button
        title={t("login")}
        onPress={() => signInWithEmail()}
        containerStyle={{ marginLeft: "auto" }}
      />
    </KeyboardAvoidingView>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    input: {
      color: theme.text.primary,
      padding: 16,
      backgroundColor: theme.bg.input,
      borderRadius: 8,
      alignSelf: "stretch",
    },
    container: {
      flex: 1,
      flexBasis: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.bg.default,
      paddingHorizontal: 24,
      gap: 8,
    },
  });
