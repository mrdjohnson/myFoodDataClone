import { useRecoilValueLoadable, useRecoilValue } from "recoil";

export default function useAsyncRecoilValue(recoilState) {
  return useRecoilValue(recoilState);
  // const recoilLoadable = useRecoilValueLoadable(recoilState);

  // console.log(
  //   "async: ",
  //   recoilState,
  //   recoilLoadable.state,
  //   recoilLoadable.contents
  // );

  // return recoilLoadable.state === "loading" ? null : recoilLoadable.contents;
}
