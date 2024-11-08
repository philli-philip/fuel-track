import React, { useContext, useRef, useState } from "react";
import {
  Alert,
  View,
  AppState,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "@/src/utils/supabase/supabase";
import { Theme, ThemeContext } from "@/src/utils/colors/colors";
import { Button, ButtonText } from "@/components/ui/button";

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
  const [loading, setLoading] = useState(false);
  const emailField = useRef<TextInput>(null);

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setLoading(false);
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
      <Pressable onPress={Keyboard.dismiss}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Image
              source={require("@/assets/images/favicon.png")}
              style={{ width: 72, height: 72 }}
            />
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize="none"
              style={style.input}
              placeholderTextColor={colors.text.light}
              onSubmitEditing={() => emailField?.current?.focus()}
              returnKeyType="next"
            />
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              style={style.input}
              placeholder="Password"
              autoCapitalize={"none"}
              placeholderTextColor={colors.text.light}
              onSubmitEditing={() => signInWithEmail()}
              returnKeyType="send"
              ref={emailField}
            />
            <Button
              disabled={loading}
              size="lg"
              onPress={() => signInWithEmail()}
              className="ml-auto"
            >
              <ButtonText>Sign in</ButtonText>
            </Button>
          </View>
        </View>
      </Pressable>
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
      width: 280,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.bg.default,
    },
  });
