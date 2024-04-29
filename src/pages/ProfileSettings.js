import ProfileNotificationsForm from "../components/ProfileSettings/ProfileNotificationsForm";
import ProfileSettingsForm from "../components/ProfileSettings/ProfileSettingsForm";

export default function ProfileSettingsPage() {
    return (
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:gap-4 lg:flex-row">
            <div className="lg:w-3/4">
                <ProfileSettingsForm />
            </div>
            <div className="lg:w-1/4">
                <ProfileNotificationsForm />
            </div>
        </div>
    );
}
