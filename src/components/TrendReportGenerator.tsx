import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, BarChart3, Plus, X, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Article {
  title: string;
  url: string;
  summary: string;
}

interface TrendReportResult {
  category: string;
  report: string;
}

export const TrendReportGenerator = () => {
  const [category, setCategory] = useState('');
  const [articles, setArticles] = useState<Article[]>([
    { title: '', url: '', summary: '' },
    { title: '', url: '', summary: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrendReportResult | null>(null);
  const [apiPath, setApiPath] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/openapi.json')
      .then((response) => response.json())
      .then((data) => {
        setApiPath(Object.keys(data.paths).find(path => path.includes('generate-trend-report')));
      });
  }, []);

  const addArticle = () => {
    setArticles([...articles, { title: '', url: '', summary: '' }]);
  };

  const removeArticle = (index: number) => {
    if (articles.length > 2) {
      setArticles(articles.filter((_, i) => i !== index));
    }
  };

  const updateArticle = (index: number, field: keyof Article, value: string) => {
    const updated = articles.map((article, i) =>
      i === index ? { ...article, [field]: value } : article
    );
    setArticles(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.trim() || articles.some(a => !a.title.trim() || !a.url.trim() || !a.summary.trim()) || !apiPath) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields before generating the report.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, articles }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate trend report');
      }

      const data: TrendReportResult = await response.json();
      setResult(data);
      toast({
        title: "Trend report generated successfully!",
        description: `Comprehensive analysis complete for ${category} category.`
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again with complete article information.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;

    const blob = new Blob([result.report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.category}-trend-report-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: "Trend report is being downloaded as markdown file."
    });
  };

  const copyReport = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.report);
      toast({
        title: "Copied to clipboard",
        description: "Trend report has been copied to your clipboard."
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy report to clipboard.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-border shadow-subtle">
        <CardHeader className="pb-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-heading">Trend Report Generator</CardTitle>
              <CardDescription className="text-muted-foreground">
                Generate comprehensive trend analysis from multiple articles and data sources
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Analysis Category</label>
              <Input
                placeholder="e.g., Technology Trends, Market Analysis, Industry Insights"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="transition-micro focus:ring-2 focus:ring-primary focus:border-primary"
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground">Source Articles</label>
              {articles.map((article, index) => (
                <Card key={index} className="bg-secondary border-border">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          placeholder="Article title"
                          value={article.title}
                          onChange={(e) => updateArticle(index, 'title', e.target.value)}
                          className="transition-micro"
                          disabled={loading}
                          required
                        />
                        <Input
                          placeholder="https://example.com/article"
                          value={article.url}
                          onChange={(e) => updateArticle(index, 'url', e.target.value)}
                          className="transition-micro"
                          disabled={loading}
                          required
                        />
                      </div>
                      <Textarea
                        placeholder="Key insights or summary from this article..."
                        value={article.summary}
                        onChange={(e) => updateArticle(index, 'summary', e.target.value)}
                        className="transition-micro resize-none"
                        rows={3}
                        disabled={loading}
                        required
                      />
                      <Button
                        type="button"
                        onClick={() => removeArticle(index)}
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive transition-micro"
                        disabled={loading || articles.length <= 2}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove Article
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                onClick={addArticle}
                variant="outline"
                className="w-full transition-micro hover:bg-secondary"
                disabled={loading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Article
              </Button>
            </div>
            
            <Button
              type="submit"
              disabled={loading || !category || articles.some(a => !a.title || !a.url || !a.summary)}
              className="w-full transition-micro hover:shadow-subtle"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Trend Report...
                </>
              ) : (
                <>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Trend Report
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-border shadow-subtle">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <CardTitle className="text-xl font-heading">Trend Report: {result.category}</CardTitle>
              <CardDescription className="text-muted-foreground">
                Comprehensive analysis based on {articles.length} source articles
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-secondary p-6 rounded-lg border border-border">
              <div className="prose prose-sm max-w-none text-secondary-foreground leading-relaxed whitespace-pre-wrap">
                {result.report}
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                onClick={downloadReport}
                variant="outline"
                className="transition-micro hover:bg-secondary flex-1"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
              <Button
                onClick={copyReport}
                variant="outline"
                className="transition-micro hover:bg-secondary flex-1"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};