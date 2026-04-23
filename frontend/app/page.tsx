import { fetchSessionScreen } from "@/lib/api/session";
import { mockSessionScreenResponse } from "@/lib/mock/mythos";
import { mapSessionScreenResponseToUI } from "@/lib/mappers/mythos";
import MythosGMUIMockup from "@/components/layout/mockupui";

const DEFAULT_CAMPAIGN_ID = "shadows-of-valemoor";

export default async function HomePage() {
  const sessionScreen = await fetchSessionScreen(DEFAULT_CAMPAIGN_ID).catch(
    () => mockSessionScreenResponse,
  );

  return <MythosGMUIMockup screen={mapSessionScreenResponseToUI(sessionScreen)} />;
}
