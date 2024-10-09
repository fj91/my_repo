import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  List,
  TextInput,
  HelperText,
} from "react-native-paper";
import { Body } from "../../components/Body";
import { useAuth } from "../../hooks/useAuth";

const CenterBody = styled(Body)`
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;
const StyledTextInput = styled(TextInput)`
  width: 100%;
`;
const StyledView = styled.View`
  width: 100%;
`;
export function PhoneNumbers() {
  const { setAuth } = useAuth();

  const { control, register, handleSubmit, formState } = useForm();

  const counterRef = useRef(0);
  counterRef.current += 1;

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    setAuth(data.phone);
  });
  return (
    <>
      <CenterBody>
        <Controller
          control={control}
          rules={{
            required: "Ingresa tu número",
            pattern: { value: /^\d{3}$/i, message: "Formato invalido" },
          }}
          name="phone"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <StyledView>
              <StyledTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Telefono"
                keyboardType="phone-pad"
                left={<TextInput.Affix text="+56 9 " />}
                error={error}
              />
              <HelperText type="error" visible={Boolean(error)}>
                {error?.message}
              </HelperText>
            </StyledView>
          )}
        ></Controller>

        <Button
          disabled={formState.isSubmitted && !formState.isValid}
          onPress={onSubmit}
        >
          ENTRAR {String(counterRef.current)}
        </Button>
      </CenterBody>
    </>
  );
}
