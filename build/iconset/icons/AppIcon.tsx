import { Icon, IconProps } from "./icon.deps.ts"

export function AppIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="app" />;
}
