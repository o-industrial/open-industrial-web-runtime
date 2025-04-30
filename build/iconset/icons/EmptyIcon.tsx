import { Icon, IconProps } from "./icon.deps.ts"

export function EmptyIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="empty" />;
}
