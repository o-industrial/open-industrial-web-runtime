import { Icon, IconProps } from "./icon.deps.ts"

export function InstallIcon(props: IconProps) {
  return <Icon {...props} src="/icons/iconset" icon="install" />;
}
