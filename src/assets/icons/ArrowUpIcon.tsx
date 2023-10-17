import SvgIcon, { SVGIconProps } from './SvgIcon';

const ArrowUpIcon = ({
  width,
  height,
  fill = 'var(--grey400)',
}: SVGIconProps) => {
  return (
    <SvgIcon width={width} height={height} fill={fill}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.8379 14.885C17.6343 15.0483 17.318 15.0362 17.1314 14.8581L12 9.95914L6.86858 14.8581C6.68198 15.0362 6.3657 15.0483 6.16214 14.885C5.95858 14.7217 5.94483 14.4449 6.13143 14.2667L11.4103 9.22703C11.7273 8.92432 12.2727 8.92432 12.5897 9.22703L17.8686 14.2667C18.0552 14.4449 18.0414 14.7217 17.8379 14.885Z'
        fill={fill}
      />
    </SvgIcon>
  );
};

export default ArrowUpIcon;
