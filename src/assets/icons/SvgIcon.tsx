export interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  fill?: string;
  path?: string;
  children?: React.ReactNode;
}

const SvgIcon = ({
  width = 24,
  height = 24,
  fill,
  path,
  children,
  ...rest
}: SVGIconProps) => {
  return (
    <svg
      {...rest}
      width={width}
      height={height}
      fill={fill}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d={path} />
      {children}
    </svg>
  );
};

export default SvgIcon;
