import {
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateUmowaDto {
  @IsString()
  handlowiec: string;

  @IsDateString()
  dataPodpisania: string;

  @IsString()
  numerUmowy: string;

  @IsString()
  imieNazwisko: string;

  @IsString()
  telefon: string;

  @IsString()
  ulica: string;

  @IsString()
  miejscowosc: string;

  @IsString()
  kodPocztowy: string;

  @IsString()
  powiat: string;

  @IsString()
  wojewodztwo: string;

  @IsString()
  rodzajKlienta: string;

  @IsString()
  peselNip: string;

  @IsString()
  dowod: string;

  @IsOptional()
  @IsString()
  tel2?: string;

  @IsOptional()
  @IsString()
  kontaktowyTel?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  operatorOsd: string;

  @IsString()
  czyWlascicielLicznika: string;

  @IsString()
  adresImie: string;

  @IsString()
  adresUlica: string;

  @IsString()
  adresNrDomu: string;

  @IsString()
  adresMiejscowosc: string;

  @IsString()
  adresKodPocztowy: string;

  @IsString()
  adresPowiat: string;

  @IsString()
  adresWojewodztwo: string;

  @IsString()
  czyPosiadaInstalacje: string;

  @IsOptional()
  @IsString()
  miejsceInstalacji?: string;

  @IsOptional()
  @IsString()
  miUlica?: string;

  @IsOptional()
  @IsString()
  miNrDomu?: string;

  @IsOptional()
  @IsString()
  miMiejscowosc?: string;

  @IsOptional()
  @IsString()
  miKod?: string;

  @IsOptional()
  @IsString()
  miPowiat?: string;

  @IsOptional()
  @IsString()
  miWojewodztwo?: string;

  @IsOptional()
  @IsString()
  miejsceMontazu?: string;

  @IsOptional()
  @IsString()
  lancuchy?: string;

  @IsOptional()
  @IsString()
  licznikLokalizacja?: string;

  @IsOptional()
  @IsString()
  zasiegInternetu?: string;

  @IsOptional()
  @IsString()
  dwieKreski?: string;

  @IsOptional()
  @IsString()
  odgromowa?: string;

  @IsOptional()
  @IsString()
  numerDzialki?: string;

  @IsOptional()
  @IsString()
  mocPrzylaczeniowa?: string;

  @IsOptional()
  @IsString()
  zabezpieczenie?: string;

  @IsOptional()
  @IsString()
  fazowa?: string;

  @IsOptional()
  @IsString()
  taryfa?: string;

  @IsOptional()
  @IsString()
  numerLicznika?: string;

  @IsOptional()
  @IsString()
  numerPpm?: string;

  @IsNumber()
  cenaBrutto: number;

  @IsNumber()
  pierwszaWplata: number;

  @IsString()
  sposobPlatnosci1: string;

  @IsString()
  czyJednaWplata: string;

  @IsOptional()
  @IsNumber()
  drugaWplata?: number;

  @IsOptional()
  @IsString()
  sposobPlatnosci2?: string;

  @IsOptional()
  @IsString()
  powierzchniaDomu?: string;

  @IsOptional()
  @IsString()
  uwagiHandlowca?: string;

  @IsOptional()
  @IsString()
  banerZamontowany?: string;

  @IsOptional()
  @IsNumber()
  handlowiecWynagrodzenie?: number;

  @IsArray()
  @IsString({ each: true })
  przedaneProdukty: string[];

  @IsNumber()
  userId: number;
}
