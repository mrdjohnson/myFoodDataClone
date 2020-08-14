import useUrlEffects from "./useUrlEffects";
import useQueryChangedEffects from "./useQueryChangedEffects";

export default function useAppEffects() {
  useUrlEffects();
  useQueryChangedEffects();
}
