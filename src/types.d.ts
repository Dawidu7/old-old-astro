type Children = {
  children: React.ReactNode
}

type SearchParams = {
  searchParams: Record<string, string>
}

type FormattedFormData = {
  [key: string]: string | FormattedFormData
}
