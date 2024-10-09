import styled from "@emotion/native";
import { View } from "react-native";
import {
  TextInput,
  Title,
  Avatar,
  Button,
  HelperText,
} from "react-native-paper";
import { useAuth } from "../../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";

const CenterBody = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 50px 30px;
`;
const StyledTitle = styled(Title)`
  justify-content: center;
  align-self: center;
  paddingtop: 50px;
`;
const StyledAvatar = styled(Avatar.Image)`
  justify-content: center;
  align-self: center;
  align-items: center;
  margin-top: 20px;
`;
const StyledTextInput = styled(TextInput)`
  width: 100%;
  margin-top: 20px;
`;
const StyledView = styled(View)`
  width: 100%;
`;
const StyledButton = styled(Button)`
  width: 60%;
  margin-top: 20px;
`;
export function PhoneNumber() {
  const { setAuth } = useAuth();
  const { control, register, handleSubmit, formState } = useForm();
  const onSubmit = handleSubmit((data) => {
    //console.log({ data });
    setAuth(data.phoneNumber);
  });

  return (
    <>
      <CenterBody>
        <StyledTitle>Hola, bienvenido!</StyledTitle>
        <StyledAvatar size={300} source={require("../../../assets/chat.jpg")} />
        <Controller
          control={control}
          rules={{
            required: "Ingresa tu teléfono...",
            pattern: { value: /^\d{8}$/i, message: "Formato inválido" },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <StyledView>
              <StyledTextInput
                label="Ingresa tu teléfono..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
                mode="outlined"
                left={<TextInput.Affix text="+56 9 " />}
                error={error}
              />
              <HelperText type="error" visible={Boolean(error)}>
                {error?.message}
              </HelperText>
            </StyledView>
          )}
          name="phoneNumber"
        ></Controller>
        <StyledButton disabled={!formState.isValid} color="#128c7e" mode="contained" onPress={onSubmit}>
          Continuar
        </StyledButton>
      </CenterBody>
    </>
  );
}
