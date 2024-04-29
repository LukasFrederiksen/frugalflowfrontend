import { BsFillBriefcaseFill } from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns';

export default function CaseNotification({ notification }) {
  // her ændre vi datetime til time ago
  const timeAgo = formatDistanceToNow(new Date(notification.created_at), { addSuffix: true });

  return (
    <div className="ff-text rounded-lg p-4 flex items-start space-x-3 hover:bg-ff_background_light dark:hover:bg-ff_background_dark transition duration-150 ease-in-out cursor-pointer">
      <BsFillBriefcaseFill className="text-xl mt-1" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 dark:text-white overflow-hidden overflow-ellipsis whitespace-nowrap">{notification.title}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm overflow-hidden line-clamp-3">{notification.content}</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs">{timeAgo}</p>
      </div>
    </div>
  );
}
