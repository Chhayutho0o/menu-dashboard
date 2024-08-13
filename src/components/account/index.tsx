import { UserSquare2 } from "lucide-react";
import { useTranslations } from "next-intl";
import TitleHeader from "@/components/commons/TitleHeader";
import ProfileTab from "@/components/account/components/ProfileTab";
import PasswordTab from "@/components/account/components/PasswordTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Configuration({ data }: any) {
  const t = useTranslations("");
  return (
    <div className="w-full">
      <div className="flex gap-3 items-center mb-5 justify-between">
        <TitleHeader title={t("account.title")} Icon={UserSquare2} />
      </div>
      <Tabs defaultValue="general">
        <TabsList className="grid sm:w-[400px] w-full grid-cols-2">
          <TabsTrigger value="general">
            {t("account.profile.title")}
          </TabsTrigger>
          <TabsTrigger value="password">
            {t("account.password.title")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <ProfileTab data={data} />
        </TabsContent>
        <TabsContent value="password">
          <PasswordTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
