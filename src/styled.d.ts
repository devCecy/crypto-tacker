// @type/styled-components 설치하면 기본적으로 존재하는 파일이나, theme 확장을 위해 파일을 생성하고 overrride 하는것!

// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
