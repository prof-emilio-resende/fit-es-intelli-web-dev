/*
  Declarações TypeScript para módulos federados.
  O TypeScript não consegue inferir tipos de bundles carregados
  em runtime, então precisamos declará-los manualmente.
*/
declare module 'footerRemote/Footer' {
  const Footer: React.ComponentType
  export default Footer
}
