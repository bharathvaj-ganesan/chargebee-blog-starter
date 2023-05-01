import PropTypes from 'prop-types';
import cn from 'classnames';
import { useConfig } from '@/lib/config';
import useTheme from '@/lib/theme';
import FormattedDate from '@/components/FormattedDate';
import TagItem from '@/components/TagItem';
import NotionRenderer from '@/components/NotionRenderer';
import TableOfContents from '@/components/TableOfContents';
import MaskedContent from '@/components/MaskedContent';

/**
 * A post renderer
 *
 * @param {PostProps} props
 *
 * @typedef {object} PostProps
 * @prop {object}   post       - Post metadata
 * @prop {object}   blockMap   - Post block data
 * @prop {boolean} [fullWidth] - Whether in full-width mode
 */
export default function Post(props) {
  const BLOG = useConfig();
  const { post, blockMap, fullWidth = false, hasMaskedContent = !post.isAllowed } = props;
  const { dark } = useTheme();

  const modifiedBlockMap = {
    ...blockMap,
    block: Object.keys(blockMap.block)
      .slice(0, Math.floor(Object.keys(blockMap.block).length / 4))
      .reduce(
        (acc, val) => ({
          ...acc,
          [val]: blockMap.block[val],
        }),
        {}
      ),
  };

  return (
    <article className={cn('flex flex-col', fullWidth ? 'md:px-24' : 'items-center')}>
      <h1
        className={cn('w-full font-bold text-3xl text-black dark:text-white', {
          'max-w-2xl px-4': !fullWidth,
        })}
      >
        {post.title}
      </h1>
      {post.type[0] !== 'Page' && (
        <nav className={cn('w-full flex mt-7 items-start text-gray-500 dark:text-gray-400', { 'max-w-2xl px-4': !fullWidth })}>
          <div className="mr-2 mb-4 md:ml-0">
            <FormattedDate date={post.date} />
          </div>
          {post.tags && (
            <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">
              {post.tags.map((tag) => (
                <TagItem key={tag} tag={tag} />
              ))}
            </div>
          )}
        </nav>
      )}
      <div className="self-stretch -mt-4 flex flex-col items-center lg:flex-row lg:items-stretch">
        {!fullWidth && <div className="flex-1 hidden lg:block" />}
        <div className={fullWidth ? 'flex-1 pr-4' : 'flex-none w-full max-w-2xl px-4'}>
          <NotionRenderer recordMap={hasMaskedContent ? modifiedBlockMap : blockMap} fullPage={false} darkMode={dark} />
          {hasMaskedContent && <MaskedContent />}
        </div>
        <div className={cn('order-first lg:order-[unset] w-full lg:w-auto max-w-2xl lg:max-w-[unset] lg:min-w-[160px]', fullWidth ? 'flex-none' : 'flex-1')}>
          {/* `65px` is the height of expanded nav */}
          {/* TODO: Remove the magic number */}
          <TableOfContents blockMap={blockMap} className="pt-3 sticky" style={{ top: '65px' }} />
        </div>
      </div>
    </article>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  blockMap: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
};
