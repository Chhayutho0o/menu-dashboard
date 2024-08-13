import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitleHeader from "../commons/TitleHeader";
import { useTranslations } from "next-intl";
import { Bolt } from "lucide-react";
import GeneralTab from "./components/GeneralTab";
import OtherTab from "./components/OtherTab";

export default function Configuration({ data }: any) {
  const t = useTranslations("");
  return (
    <div className="w-full">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={t("config.title")} Icon={Bolt} />
      </div>
      <Tabs defaultValue="general">
        <TabsList className="grid sm:w-[400px] w-full grid-cols-2">
          <TabsTrigger value="general">{t("config.general.title")}</TabsTrigger>
          <TabsTrigger value="others">{t("config.others.title")}</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralTab data={data} />
        </TabsContent>
        <TabsContent value="others">
          <OtherTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
