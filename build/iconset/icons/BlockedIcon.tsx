import { Icon, IconProps } from "./icon.deps.ts"

export function BlockedIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="blocked" />;
}
