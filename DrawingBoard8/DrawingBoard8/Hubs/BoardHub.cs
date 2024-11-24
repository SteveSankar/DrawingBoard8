using Microsoft.AspNetCore.SignalR;
using static DrawingBoard8.Client.Pages.DrawingBoard;

namespace WhiteBoardAPP.Hubs
{
    public class BoardHub : Hub
    {
        private static readonly List<User> connectedUsers = new List<User>();

        public async Task SendUserDetails(string userName, string userColor)
        {
            var user = new User { Name = userName, Color = userColor };
            connectedUsers.Add(user);

            // Broadcast the new user to all connected clients
            await Clients.All.SendAsync("UserJoined", userName, userColor);
        }

        public async Task DrawingAsync(int startX, int startY, int endX, int endY, string color, string name)
        {
            // Send drawing data to all clients except the sender
            await Clients.Others.SendAsync("OnDrawingAsync", startX, startY, endX, endY, color, name);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userName = connectedUsers.FirstOrDefault(u => u.Name == Context.ConnectionId)?.Name;
            var user = connectedUsers.FirstOrDefault(u => u.Name == userName);

            if (user != null)
            {
                connectedUsers.Remove(user);
                await Clients.All.SendAsync("UserDisconnected", userName);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
