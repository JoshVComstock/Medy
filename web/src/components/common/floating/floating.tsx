import { useDelayUnmount } from "@/components/hooks/useDelayUnmount";
import { ModalState } from "../modal/useModal";

interface Props {
  children: React.ReactNode;
  state: ModalState;
  width?: string;
}

const Floating = ({ children, state, width }: Props) => {
  const containerClasses = [
    "fixed right-0 h-full bg-white shadow-xl z-10 transition-all duration-300 animate-[appearFromRight_.3s] max-w-full",
  ];

  const bgClasses = [
    "bg-black/20 w-full h-full transition-all duration-300 animate-[appear_.3s]",
  ];
  if (state.open) {
    bgClasses.push("opacity-1");
  } else {
    bgClasses.push("opacity-0");
  }

  const render = useDelayUnmount(state.open, 300);

  if (!render) return null;
  return (
    <div className="z-50 fixed inset-0 flex justify-end isolate">
      <div onClick={state.closeModal} className={bgClasses.join(" ")} />
      <section
        style={{
          width: width || "auto",
          transform: state.open ? `unset` : `translateX(100%)`,
        }}
        className={containerClasses.join(" ")}
      >
        {children}
      </section>
    </div>
  );
};

export default Floating;
