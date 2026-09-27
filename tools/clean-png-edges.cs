using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

internal static class CleanPngEdges
{
    private sealed class Component
    {
        public readonly List<int> Pixels = new List<int>();
        public int MinX = int.MaxValue;
        public int MinY = int.MaxValue;
        public int MaxX;
        public int MaxY;
    }

    public static int Main(string[] args)
    {
        if (args.Length < 2)
        {
            Console.Error.WriteLine("Usage: clean-png-edges <output-dir> <png> [png...]");
            return 1;
        }

        Directory.CreateDirectory(args[0]);

        for (var i = 1; i < args.Length; i++)
        {
            Clean(args[i], Path.Combine(args[0], Path.GetFileName(args[i])));
        }

        return 0;
    }

    private static void Clean(string inputPath, string outputPath)
    {
        using (var image = new Bitmap(inputPath))
        {
            var rect = new Rectangle(0, 0, image.Width, image.Height);
            var data = image.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            var bytes = new byte[Math.Abs(data.Stride) * image.Height];
            Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);

            var visited = new bool[image.Width * image.Height];
            var removedComponents = 0;
            var removedPixels = 0;
            var offsets = new[] { -1, 0, 1 };

            for (var y = 0; y < image.Height; y++)
            {
                for (var x = 0; x < image.Width; x++)
                {
                    var index = y * image.Width + x;
                    if (visited[index] || Alpha(bytes, data.Stride, x, y) < 128)
                    {
                        continue;
                    }

                    var component = new Component();
                    var queue = new Queue<int>();
                    queue.Enqueue(index);
                    visited[index] = true;

                    while (queue.Count > 0)
                    {
                        var current = queue.Dequeue();
                        var currentX = current % image.Width;
                        var currentY = current / image.Width;
                        component.Pixels.Add(current);
                        component.MinX = Math.Min(component.MinX, currentX);
                        component.MinY = Math.Min(component.MinY, currentY);
                        component.MaxX = Math.Max(component.MaxX, currentX);
                        component.MaxY = Math.Max(component.MaxY, currentY);

                        foreach (var offsetY in offsets)
                        {
                            foreach (var offsetX in offsets)
                            {
                                if (offsetX == 0 && offsetY == 0) continue;
                                var neighborX = currentX + offsetX;
                                var neighborY = currentY + offsetY;
                                if (neighborX < 0 || neighborY < 0 || neighborX >= image.Width || neighborY >= image.Height) continue;
                                var neighbor = neighborY * image.Width + neighborX;
                                if (visited[neighbor] || Alpha(bytes, data.Stride, neighborX, neighborY) < 128) continue;
                                visited[neighbor] = true;
                                queue.Enqueue(neighbor);
                            }
                        }
                    }

                    var componentWidth = component.MaxX - component.MinX + 1;
                    var componentHeight = component.MaxY - component.MinY + 1;
                    var isArtifact = component.Pixels.Count < 500 || componentWidth <= 2 || componentHeight <= 2;
                    if (!isArtifact) continue;

                    removedComponents++;
                    removedPixels += component.Pixels.Count;
                    var clearMinX = Math.Max(0, component.MinX - 3);
                    var clearMaxX = Math.Min(image.Width - 1, component.MaxX + 3);
                    var clearMinY = Math.Max(0, component.MinY - 3);
                    var clearMaxY = Math.Min(image.Height - 1, component.MaxY + 3);
                    for (var clearY = clearMinY; clearY <= clearMaxY; clearY++)
                    {
                        for (var clearX = clearMinX; clearX <= clearMaxX; clearX++)
                        {
                            var alphaIndex = clearY * data.Stride + clearX * 4 + 3;
                            bytes[alphaIndex] = 0;
                        }
                    }
                }
            }

            var fileName = Path.GetFileName(inputPath);
            if (fileName.Equals("Chill-Peguin.png", StringComparison.OrdinalIgnoreCase))
            {
                ClearOutside(bytes, data.Stride, image.Width, image.Height, 72, 400);
                ClearRows(bytes, data.Stride, image.Width, image.Height, image.Height - 2);
            }
            if (fileName.Equals("Boomer Kuwanger.png", StringComparison.OrdinalIgnoreCase)) ClearOutside(bytes, data.Stride, image.Width, image.Height, 96, 370);
            if (fileName.Equals("LauncheOctopus.png", StringComparison.OrdinalIgnoreCase)) ClearOutside(bytes, data.Stride, image.Width, image.Height, 68, 390);
            if (fileName.Equals("FlameMammoth.png", StringComparison.OrdinalIgnoreCase)) ClearOutside(bytes, data.Stride, image.Width, image.Height, 84, 386);

            Marshal.Copy(bytes, 0, data.Scan0, bytes.Length);
            image.UnlockBits(data);
            image.Save(outputPath, ImageFormat.Png);
            Console.WriteLine(Path.GetFileName(inputPath) + ": removed " + removedComponents + " components / " + removedPixels + " pixels");
        }
    }

    private static byte Alpha(byte[] bytes, int stride, int x, int y)
    {
        return bytes[y * stride + x * 4 + 3];
    }

    private static void ClearOutside(byte[] bytes, int stride, int width, int height, int minX, int maxX)
    {
        for (var y = 0; y < height; y++)
        {
            for (var x = 0; x < width; x++)
            {
                if (x >= minX && x <= maxX) continue;
                bytes[y * stride + x * 4 + 3] = 0;
            }
        }
    }

    private static void ClearRows(byte[] bytes, int stride, int width, int height, int startY)
    {
        for (var y = Math.Max(0, startY); y < height; y++)
        {
            for (var x = 0; x < width; x++)
            {
                bytes[y * stride + x * 4 + 3] = 0;
            }
        }
    }
}
