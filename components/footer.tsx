export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TheEternalHighwayStation.
        </p>
      </div>
    </footer>
  )
}

