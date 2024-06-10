import React from 'react';

export type Art = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};

export type AccordionUsageProps = {
  title: string;
  value?: string;
  onChangeValue: React.Dispatch<React.SetStateAction<string>>;
  valueFrom: string;
  valueTo: string;
  onChangeInputFromValue: React.Dispatch<React.SetStateAction<string>>;
  onChangeInputToValue: React.Dispatch<React.SetStateAction<string>>;
};

export type ArtTotalProps = {
  searchValue: string;
  currentPage: number;
  valueAuthor: string;
  valueLocation: string;
  valueAgeFrom: string;
  valueAgeTo: string;
};

export type ArtAuthors = {
  id: number;
  name: string;
};

export type ArtLocation = {
  is: number;
  location: string;
};

export type ComboType = {
  data: Art;
  authors: ArtAuthors;
  locations: ArtLocation;
};

export type InputProps = {
  valueFrom: string;
  valueTo: string;
  onChangeInputFromValue: React.Dispatch<React.SetStateAction<string>>;
  onChangeInputToValue: React.Dispatch<React.SetStateAction<string>>;
};

export type ReactSelectProps = {
  data: ArtAuthors[] | ArtLocation[];
  title: string;
  onChangeValue: React.Dispatch<React.SetStateAction<string>>;
};

export type FilterMenuRef = { filterMenuRef: React.RefObject<HTMLDivElement> };

export type ClickOutsideProps = {
  ref: React.RefObject<HTMLButtonElement>;
  callback: () => void;
  filterMenuRef: React.RefObject<HTMLDivElement>;
};
