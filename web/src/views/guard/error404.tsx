import { useLang } from "@/context/lang"

const Error404 = () => {
  const {translate} = useLang()
  return (
    <div className="dark:bg-gray-800 dark:text-white">
     {translate("NOT_FOUND_PAGE")}
    </div>
  )
}

export default Error404