import { fetchSessionScreen } from "@/lib/api/session";
import MythosGMUIMockup from "@/components/layout/mockupui";

const DEFAULT_CAMPAIGN_ID = "shadows-of-valemoor";

export default async function HomePage() {
  const sessionScreen = await fetchSessionScreen(DEFAULT_CAMPAIGN_ID);

  return (
    <MythosGMUIMockup
      campaignId={DEFAULT_CAMPAIGN_ID}
      screen={sessionScreen}
    />
  );
}
