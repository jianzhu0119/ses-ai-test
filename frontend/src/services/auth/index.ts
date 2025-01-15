import { useMutation } from "@tanstack/react-query";
import { login } from "./api";
import { register } from "./api";

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });

export const useRegisterMutation = () =>
  useMutation({ mutationKey: ["register"], mutationFn: register });
