import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// بتحدد كل التايبس الموجودة بال ستيت متل كاتيغوري وال برويكت بس حطيناها هون ب خوك مشان الاختصار الكتابة
export const useAppSelector = useSelector.withTypes<RootState>();
