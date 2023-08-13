type Children = {
  children: React.ReactNode
}

type SearchParams = {
  searchParams: Record<string, string | string[] | undefined>
}

type FormattedFormData = {
  [key: string]: string | FormattedFormData
}
