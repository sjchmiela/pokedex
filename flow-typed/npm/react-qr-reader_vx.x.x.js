declare module "react-qr-reader" {
  declare module.exports: React$ComponentType<{
    delay: number | false,
    onScan: string => void,
    className?: string
  }>;
}
