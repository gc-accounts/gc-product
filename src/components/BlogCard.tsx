import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { CalendarDays, Tag, User } from 'lucide-react';

interface BlogCardProps {
  post_title: string;
  category: string;
  author?: string;
  publish_date?: string;
  onReadMorePath: string;
  isOpenCampusBlog?: boolean;
  opencampus_category?: any;
  opencampus_sub_category?: any;
  publishedAt?: string;
  featured_image_url?: string; // Assuming image URL is available
}

const FALLBACK_IMAGE_URL = 'https://strapi.greycampus.com/uploads/teamwork_making_online_blog_min_66aff99361.jpg';

const getIcon = (name: string) => {
  const iconClass = "w-4 h-4 mr-1 text-gray-500"; // Smaller icons, subtler color
  switch (name) {
    case 'tag':
      return <Tag className={iconClass} />;
    case 'event':
      return <CalendarDays className={iconClass} />;
      case 'auther':
      return <User className={iconClass} />;
    default:
      return null;
  }
};

const BlogCard: React.FC<BlogCardProps> = ({
  post_title,
  category,
  author,
  publish_date,
  onReadMorePath,
  isOpenCampusBlog = false,
  opencampus_category,
  publishedAt,
  featured_image_url = "", // Default image tag
}) => {

  // Determine the final image source: use featured_image_url if truthy, otherwise use the fallback
  const finalImageUrl = featured_image_url || FALLBACK_IMAGE_URL;

  const displayCategory = isOpenCampusBlog ? opencampus_category?.name || 'Uncategorized' : category;
  const displayAuthor = isOpenCampusBlog ? 'Admin' : author || 'Unknown Author';
  const displayDate = publish_date
    ? new Date(publish_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : publishedAt
      ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : 'Unknown Date';

  return (
    <Card className="relative flex flex-col border border-gray-200 rounded-xl bg-white h-full overflow-hidden hover:border-primary-green shadow-md hover:shadow-lg transition duration-300">
      
      {/* Blog Image */}
      {/* Changed h-50 to h-40 for better grid proportionality, similar to previous suggestion */}

      {featured_image_url && 
      <div className="w-full h-40 bg-gray-200 overflow-hidden"> 
        <img
          // *** USE THE finalImageUrl VARIABLE HERE ***
          src={finalImageUrl}
          alt={post_title}
          className="w-full h-full object-cover"
        />
      </div>
}

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-4 space-y-3">
        {/* Title */}
        <h3 className="md:text-base text-sm font-semibold text-gray-800 line-clamp-2 min-h-[45px]">{post_title}</h3>

        {/* Category/Author/Date Info */}
        <div className="flex flex-col text-sm text-gray-600 space-y-1">
          <div className="flex items-center">
            {getIcon('tag')}
            <span className="text-xs capitalize">{displayCategory}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 border-gray-300 border-t pt-2 mt-2">
             <div className="flex items-center">
                {getIcon('auther')}
               <span>{displayAuthor}</span>
             </div>
             
             <div className="flex items-center">
                {getIcon('event')}
                <span>{displayDate}</span>
             </div>
          </div>
        </div>

        {/* Read More Link */}
        <div className="mt-auto pt-3 flex justify-end">
          <Link
            href={onReadMorePath}
            // Styled like a button or a strong link
            className="inline-block px-4 py-2 text-xs font-semibold text-white bg-[#34AEB5] rounded-md hover:bg-[#2a8c91] transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard